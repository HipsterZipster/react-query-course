import { jsx, jsxs } from 'react/jsx-runtime';
import { Link, Outlet } from '@tanstack/react-router';

function SidebarLink({
  to,
  label
}) {
  return /* @__PURE__ */ jsx(Link, { to, className: "block p-2 hover:bg-gray-100 rounded transition-colors", activeProps: {
    className: "bg-blue-50 text-blue-700 font-medium"
  }, children: label });
}
const SplitComponent = function ExamplesLayout() {
  return /* @__PURE__ */ jsx("div", { className: "max-w-6xl mx-auto p-6", children: /* @__PURE__ */ jsxs("div", { className: "flex", children: [
    /* @__PURE__ */ jsxs("div", { className: "w-64 pr-8", children: [
      /* @__PURE__ */ jsx("h3", { className: "font-medium text-lg mb-4", children: "Examples" }),
      /* @__PURE__ */ jsxs("nav", { className: "space-y-2", children: [
        /* @__PURE__ */ jsx(SidebarLink, { to: "/examples/introduction", label: "1. Introduction" }),
        /* @__PURE__ */ jsx(SidebarLink, { to: "/examples/getting-started", label: "2. Getting Started" }),
        /* @__PURE__ */ jsx(SidebarLink, { to: "/examples/basic-query", label: "3. Basic Query" }),
        /* @__PURE__ */ jsx(SidebarLink, { to: "/examples/advanced-queries", label: "4. Advanced Queries" }),
        /* @__PURE__ */ jsx(SidebarLink, { to: "/examples/suspense", label: "5. Suspense" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "mt-6 pt-4 border-t", children: /* @__PURE__ */ jsx(Link, { to: "/", className: "text-blue-600 hover:underline", children: "\u2190 Back to Home" }) })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "flex-1", children: /* @__PURE__ */ jsx(Outlet, {}) })
  ] }) });
};

export { SplitComponent as component };
//# sourceMappingURL=examples--2i-whzw.mjs.map
