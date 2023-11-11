<template>
  <div>
    <CustomSnackbar ref="snackbar" />
    <EditActionNav ref="nav" @submit="save" />
    <EditActionWorkspace ref="workspace" @change="onWorkspaceChange()" />
  </div>
</template>

<script>
import EditActionWorkspace from "@/components/actions/EditActionWorkspace.vue";
import EditActionNav from "@/components/actions/EditActionNav.vue";
import CustomSnackbar from "@/components/misc/CustomSnackbar.vue";
import UploadContent from "@/utils/UploadContent";

export default {
  name: "EditAction",
  metaInfo() {
    return {
      title: this.getTitle(),
    };
  },
  components: {
    EditActionNav,
    EditActionWorkspace,
    CustomSnackbar,
  },
  data() {
    return {
      id: null,
      workspaceChanged: false,
    };
  },
  methods: {
    async save(content) {
      this.workspaceChanged = false;
      const user = {
        token: localStorage.getItem("token"),
        rank: localStorage.getItem("rank"),
      };
      const uploadResult = await UploadContent.uploadAction(this.$refs.workspace.save(), content, user, this.id, this.$apiHostname);
      if (uploadResult.success) {
        this.$refs.snackbar.show(uploadResult.message, "success");
        this.$refs.snackbar.setButton("View", "white", () => {
          let routeData = this.$router.resolve({ name: "action", params: { id: uploadResult.id } });
          window.open(routeData.href, "_blank");
        });
        this.$refs.snackbar.timeout = 1500;
        this.id = uploadResult.id;
        this.$refs.nav.setId(this.id);
      } else this.$refs.snackbar.show(uploadResult.message, "error");
    },
    isCopy() {
      return this.$route.params.copy;
    },
    onWorkspaceChange() {
      this.workspaceChanged = true;
    },
    getTitle() {
      return this.isCopy() ? "Edit Action" : "New Action";
    },
  },
  beforeRouteLeave(to, from, next) {
    if (!this.workspaceChanged) return next();
    const answer = window.confirm("You have unsaved changes.\nAre you sure you want to leave?");
    if (answer) next();
  },
  mounted() {
    if (!this.$route.params.id) return;
    this.id = this.$route.params.id;
    if (!this.isCopy()) this.$refs.nav.setId(this.id);

    const response = fetch(`${this.$apiHostname}/actions/${this.id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    }).then((res) => {
      res.json().then((json) => {
        if (this.isCopy()) json.post.title += " (Remix)";
        this.$refs.nav.setPost(json.post);
        this.$refs.nav.setVisibility(json.isPublic);
        this.$refs.workspace.load(JSON.parse(json.workspace));
      });
    });

    if (this.isCopy()) {
      this.id = null;
    }
  },
};
</script>
