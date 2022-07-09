// for blog posts
// get all blog data when building
export async function getAllPostsData() {
  const res = await fetch(
    new URL(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/list-post/`)
  );
  const allPosts = await res.json();
  const sortedPosts = allPosts.sort(
    (a, b) => new Date(b.created_at) - new Date(a.created_at)
  );

  return sortedPosts;
}

// get the array of all posts IDs
export async function getAllPostIds() {
  const res = await fetch(
    new URL(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/list-post/`)
  );
  const allPosts = await res.json();
  const allIds = allPosts.map((post) => {
    return {
      params: {
        id: String(post.id),
      },
    };
  });

  return allIds;
}

// get details of all  blog posts
export async function getPostDetail(id) {
  const res = await fetch(
    new URL(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/detail-post/${id}`)
  );
  const post = await res.json();

  return post;
}
