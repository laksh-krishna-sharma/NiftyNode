export interface ProfileRequest {
  apiKey: string;
}

export interface ProfileResponse {
  user_id: string;
  user_name: string;
  user_shortname: string;
  email: string;
  user_type: string;
  broker: string;
  exchanges: string[];
  products: string[];
  order_types: string[];
  avatar_url: string | null;
  meta: {
    demat_consent: string;
  };
}