<template>
  <div class="blog-post">
    <div class="post-type">
      <span v-if="post.frontmatter.emoji">{{ post.frontmatter.emoji }}</span>
      <span v-else>📝</span>
    </div>
    <h2 class="post-title">
      <a class="post-link" :href="post.path">{{ post.title }}</a>
    </h2>
    <p class="post-date">{{ new Date(post.frontmatter.date).toLocaleDateString("en-US") }}</p>
  </div>
</template>

<script>
export default {
  props: ["post"]
};
</script>

