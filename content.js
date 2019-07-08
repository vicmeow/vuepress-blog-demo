const fs = require("fs");
const sanityClient = require("@sanity/client");
const sanity = sanityClient({
  projectId: 'z3r569xy',
  dataset: 'production',
  useCdn: true
});

async function createBlogPosts() {
  const query = '*[_type == "post"]';
  const posts = await sanity.fetch(query).then(post => post);
  try {
    return posts.forEach(post => {
      const fileName = post.slug.current;
      const filePath = "posts/" + fileName + ".md";
      const fileContent = `---\ndate: ${post._createdAt}\nemoji: ${
        post.emoji
      } \n---\n\n# ${post.title}\n\n${post.content}`;
      try {
        fs.writeFileSync(filePath, fileContent, { flag: "wx" });
        console.log("file written for " + fileName);
      } catch (e) {
        console.log(e);
      }
    });
  } catch (e) {
    console.log(e);
  }
}

const run = async () => {
  await createBlogPosts();
  process.exit();
};

run();
