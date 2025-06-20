import React from "react";
import ReactDOM from "react-dom/client";
import { Authenticator } from '@aws-amplify/ui-react';
import App from "./App.tsx";
import "./index.css";
import '@aws-amplify/ui-react/styles.css';
import { Amplify } from "aws-amplify";
import { parseAmplifyConfig } from "aws-amplify/utils";
import outputs from "../amplify_outputs.json";

// const amplifyConfig = parseAmplifyConfig(outputs);

// Amplify.configure(
//   {
//     ...amplifyConfig,
//     API: {
//       ...amplifyConfig.API,
//       REST: outputs.custom.API,
//     },
//   },
//   {
//     API: {
//       REST: {
//         retryStrategy: {
//           strategy: 'no-retry' // Overrides default retry strategy
//         },
//       }
//     },
//   }
// );
Amplify.configure(outputs);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Authenticator>
      <App />
    </Authenticator>
  </React.StrictMode>
);
