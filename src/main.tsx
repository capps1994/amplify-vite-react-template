import React from "react";
import ReactDOM from "react-dom/client";
import { Authenticator } from '@aws-amplify/ui-react';
import App from "./App.tsx";
import "./index.css";
import '@aws-amplify/ui-react/styles.css';
import { Amplify } from "aws-amplify";
import { parseAmplifyConfig } from "aws-amplify/utils";
import outputs from "../amplify_outputs.json";
import { fetchAuthSession } from "aws-amplify/auth";

const amplifyConfig = parseAmplifyConfig(outputs);

const session = await fetchAuthSession();
const token = session.tokens?.idToken

Amplify.configure(
  {
    ...amplifyConfig,
    API: {
      ...amplifyConfig.API,
      REST: outputs.custom.API,
    },
  },
  {
    API: {
      REST: {
        headers: async () => {
          return {Authorization: `Bearer ${token}`}; // Use the token from the session
        },
        retryStrategy: {
          strategy: 'no-retry' // Overrides default retry strategy
        },
      }
    },
  }
);


ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Authenticator>
      <App />
    </Authenticator>
  </React.StrictMode>
);
