import React from "react";
import { providers } from "./providers";
//https://alexkorep.com/react/react-many-context-providers-tree/
const BuildProviderTree = (p) => {
  if (p.length === 1) {
    return p[0];
  }
  const A = p.shift();
  const B = p.shift();
  return BuildProviderTree([
    ({ children }) => (
      <A>
        <B>{children}</B>
      </A>
    ),
    ...p,
  ]);
};

export const GlobalStateProvider = BuildProviderTree(providers);
