export interface Geo {
    lat: string;
    lng: string;
  }
  
  export interface Address {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: Geo;
  }
  
  export interface Company {
    name: string;
    catchPhrase: string;
    bs: string;
  }
  
  export interface UserApiResponse {
    id: number;
    name: string;
    username: string;
    email: string;
    address: Address;
    phone: string;
    website: string;
    company: Company;
  }
  
  export type User = Pick<UserApiResponse, "id" | "name" | "email" | "phone"> & {
    city: Address["city"];
  };

  export const mapUserFromApi = (apiUser: UserApiResponse): User => ({
    id: apiUser.id,
    name: apiUser.name,
    email: apiUser.email,
    phone: apiUser.phone,
    city: apiUser.address.city,
  });
  