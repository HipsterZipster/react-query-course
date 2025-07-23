import { notFound } from '@tanstack/react-router';
import axios from 'redaxios';
import { e as createServerRpc, f as createServerFn } from './ssr.mjs';
import 'react/jsx-runtime';
import '@tanstack/react-query';
import '@tanstack/react-router-with-query';
import '@tanstack/react-query-devtools';
import '@tanstack/react-router-devtools';
import 'node:async_hooks';
import '@tanstack/react-router/ssr/server';

const fetchPosts_createServerFn_handler = createServerRpc("src_utils_posts_tsx--fetchPosts_createServerFn_handler", "/_serverFn", (opts, signal) => {
  return fetchPosts.__executeServer(opts, signal);
});
const fetchPost_createServerFn_handler = createServerRpc("src_utils_posts_tsx--fetchPost_createServerFn_handler", "/_serverFn", (opts, signal) => {
  return fetchPost.__executeServer(opts, signal);
});
const fetchPosts = createServerFn({
  method: "GET"
}).handler(fetchPosts_createServerFn_handler, async () => {
  console.info("Fetching posts...");
  return axios.get("https://jsonplaceholder.typicode.com/posts").then((r) => r.data.slice(0, 10));
});
const fetchPost = createServerFn({
  method: "GET"
}).validator((d) => d).handler(fetchPost_createServerFn_handler, async ({
  data
}) => {
  console.info(`Fetching post with id ${data}...`);
  const post = await axios.get(`https://jsonplaceholder.typicode.com/posts/${data}`).then((r) => r.data).catch((err) => {
    console.error(err);
    if (err.status === 404) {
      throw notFound();
    }
    throw err;
  });
  return post;
});

export { fetchPost_createServerFn_handler, fetchPosts_createServerFn_handler };
//# sourceMappingURL=posts-D9puAoOd.mjs.map
