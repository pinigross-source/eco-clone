// Decides whether the newest (not-yet-launched) blog posts are visible.
// On preview/staging hosts they show; on envirobiotics.com they stay hidden
// until the launch is approved. The server branch is compiled out of the
// client bundle by createIsomorphicFn.
import { createIsomorphicFn } from "@tanstack/react-start";
import { isTestEnv } from "@/lib/env";
import { resolveShowNewBlogsServer } from "@/lib/blogVisibility.server";

const resolve = createIsomorphicFn()
  .client(() => isTestEnv)
  .server(() => resolveShowNewBlogsServer());

export async function resolveShowNewBlogs(): Promise<boolean> {
  return resolve();
}
