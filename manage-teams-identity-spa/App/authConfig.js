/**
 * Configuration object to be passed to MSAL instance on creation. 
 * For a full list of MSAL.js configuration parameters, visit:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/configuration.md
 * For more details on using MSAL.js with Azure AD B2C, visit:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/working-with-b2c.md 
 */

export const msalConfig = {
  auth: {
    clientId: process.env.AAD_CLIENT_ID,
    redirectUri: "http://localhost:3000/spa", // You must register this URI on Azure Portal/App Registration. Defaults to "window.location.href".
    authority: `https://login.microsoftonline.com/${process.env.AAD_TENANT_ID}`,
  },
  cache: {
    cacheLocation: "sessionStorage", // Configures cache location. "sessionStorage" is more secure, but "localStorage" gives you SSO between tabs.
    storeAuthStateInCookie: false, // If you wish to store cache items in cookies as well as browser cache, set this to "true".
  },
  system: {
    loggerOptions: {
      loggerCallback: (level, message, containsPii) => {
        if (containsPii) {
          return;
        }
        switch (level) {
          case msal.LogLevel.Error:
            console.error(message);
            return;
          case msal.LogLevel.Info:
            console.info(message);
            return;
          case msal.LogLevel.Verbose:
            console.debug(message);
            return;
          case msal.LogLevel.Warning:
            console.warn(message);
            return;
        }
      }
    }
  }
};

export const loginRequest = {
  scopes: ["openid"], // By default, MSAL.js will add OIDC scopes (openid, profile, email) to any login request.
  prompt: 'select_account'
};

export const teamsUserRequest = {
  scopes: [
    'https://auth.msft.communication.azure.com/Teams.ManageCalls',
    'https://auth.msft.communication.azure.com/Teams.ManageChats'
  ]
};

export const teamsUserLoginRequest = {
  ...loginRequest,
  extraScopesToConsent: teamsUserRequest.scopes
};