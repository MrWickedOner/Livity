import { T as TSS_SERVER_FUNCTION, c as createServerFn } from "../server.js";
import { readFile } from "node:fs/promises";
import "node:async_hooks";
import "h3-v2";
import "@tanstack/router-core";
import "seroval";
import "@tanstack/history";
import "@tanstack/router-core/ssr/client";
import "@tanstack/router-core/ssr/server";
import "react";
import "@tanstack/react-router";
import "react/jsx-runtime";
import "@tanstack/react-router/ssr/server";
var createServerRpc = (serverFnMeta, splitImportFn) => {
  const url = "/_serverFn/" + serverFnMeta.id;
  return Object.assign(splitImportFn, {
    url,
    serverFnMeta,
    [TSS_SERVER_FUNCTION]: true
  });
};
const getBusinessName_createServerFn_handler = createServerRpc({
  id: "ed9e0b62e19345253bb81dfb20bac27bb23001205689ad75c3f2879c99c299c4",
  name: "getBusinessName",
  filename: "src/routes/index.tsx"
}, (opts) => getBusinessName.__executeServer(opts));
const getBusinessName = createServerFn({
  method: "GET"
}).handler(getBusinessName_createServerFn_handler, async () => {
  try {
    const cfg = JSON.parse(await readFile("site.json", "utf8"));
    return cfg.businessName?.trim() ?? "";
  } catch {
    return "";
  }
});
export {
  getBusinessName_createServerFn_handler
};
