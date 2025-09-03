export interface CustomerDataModel {
    id: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    company: string;
    country: string;
    profilePicUrl: string;
    createdAt: string;

}
export interface CustomerListResponse {
    data: CustomerDataModel[];
    items: number;
    pages: number;
    last: number;
    next: number;
    first: number;
    prev: number;
}

export interface CustomerAttributes {
    customerId: string;
    status: 'Active' | 'Inactive';
}

export interface MembershipLevel {
    level: 'Basic' | 'Premium' | 'VIP';
    benefits: string[];
}

export interface CustomerMembership {
    customerId: string;
    membershipLevel: MembershipLevel;
    startDate: string;
    endDate: string;
}