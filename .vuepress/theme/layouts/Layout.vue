<template>
  <div class="layout">
    <!-- Navigation -->
    <nav>
      <a
        class="nav-link"
        :class="{'active-nav-link': $page.path == route.link}"
        v-for="route in routes"
        :key="route.index"
        :href="route.link"
        v-text="route.text"
      />
    </nav>
    <!-- PAGE EMOJI -->
    <div class="post-type emoji" v-if="$frontmatter.emoji">{{ $frontmatter.emoji }}</div>
    <!-- HOME CONTENT -->
    <Content/>
    <!-- DATE ON POST PAGE -->
    <div
      class="post-date"
      v-if="$page.path.match(/posts/g)"
    >{{ new Date($frontmatter.date).toLocaleDateString("en-US") }}</div>
    <!-- POSTS ON HOME PAGE -->
    <div class="posts" v-if="$page.path === '/'">
      <blog-post v-for="post in posts" :key="post.path" :post="post"/>
    </div>
  </div>
</template>

<script>
import BlogPost from "../components/BlogPost";
export default {
  components: { BlogPost },
  computed: {
    routes() {
      return this.$themeConfig.nav;
    },
    posts() {
      return this.$site.pages
        .filter(post => post.path.match(/posts/g))
        .sort(
          (a, b) => new Date(b.frontmatter.date) - new Date(a.frontmatter.date)
        );
    }
  }
};
</script>