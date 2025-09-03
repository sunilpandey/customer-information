export interface Customer {
    name: string;
    company: string;
    phoneNumber: string;
    email: string;
    country: string;
    status: 'Active' | 'Inactive';
    profilePicUrl: string;
    creationDate: string;
    membershipStartDate?: string;
    membershipEndDate?: string;
}

export interface CustomerList {
    customers: Customer[];
}