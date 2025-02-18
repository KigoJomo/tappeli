declare namespace google{
  namespace accounts {
    namespace id{
      function initialize(options: {
        client_id: string;
        callback: (response: CredentialResponse) => void;
        nonce: string;
        use_fedcm_for_prompt?: boolean;
      }): void;
      function prompt(): void;
    }
  }
}

interface Window {
  google: {
    accounts: {
      id: {
        initialize: (options: {
          client_id: string;
          callback: (response: CredentialResponse) => void;
          nonce?: string;
          use_fedcm_for_prompt?: boolean;
        }) => void;
        prompt: () => void;
      };
    };
  };
}

interface CredentialResponse{
  credential: string
}