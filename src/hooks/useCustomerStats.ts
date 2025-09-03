import { useQuery } from "@tanstack/react-query";
import { useCustomerAggregatorService } from "../context/hooks/useCustomerAggregatorService";
import { getStartDateOfCurrentMonth } from '../core/utils';

export function useCustomerStats() {
    const { getCustomerStats, getTotalMembersList, getTotalCustomerCount } = useCustomerAggregatorService();

    const { data: statsData, isLoading: isLoadingCustomerStats, isError: isStatsError, error: statsError } = useQuery({
        queryKey: ["customerStats"],
        queryFn: getCustomerStats,
    });

    const startDate = getStartDateOfCurrentMonth();
    const { data: membersLastMonth, isLoading: isLoadingMembersLastMonth, isError: isLastMonthError, error: lastMonthError } = useQuery({
        queryKey: ["lastMonthMember", startDate],
        queryFn: () => getTotalMembersList(startDate),
    });

    const currentDate = new Date();
    const { data: presentMembers, isLoading: isLoadingPresentMembers, isError: isPresentError, error: presentError } = useQuery({
        queryKey: ["currentMonthMember", currentDate.toISOString().split('T')[0]], // Use date string for cache key to handle daily changes
        queryFn: () => getTotalMembersList(currentDate),
    });

    const { data: totalCustomersLastMonth, isLoading: isLoadingTotalCustomers, isError: isTotalError, error: totalError } = useQuery({
        queryKey: ["totalCustomers", startDate.toISOString().split('T')[0]],
        queryFn: () => getTotalCustomerCount(startDate),
    });

    const isLoading = isLoadingCustomerStats || isLoadingMembersLastMonth || isLoadingPresentMembers || isLoadingTotalCustomers;
    const isError = isStatsError || isLastMonthError || isPresentError || isTotalError;
    const error = statsError || lastMonthError || presentError || totalError || null;

    return {
        ...(statsData ?? { totalCustomers: 0, activeCustomers: 0 }),
        isLoading,
        isError,
        error,
        membersLastMonth: membersLastMonth?.totalMembers,
        presentMembers: presentMembers?.totalMembers,
        totalCustomersLastMonth: totalCustomersLastMonth?.totalCustomers ?? 0,
    };
}