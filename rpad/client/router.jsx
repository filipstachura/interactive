let rSession = new RSession();

FlowRouter.route("/", {
  subscriptions: function() {
    /*
    var selector = {category: {$ne: "private"}};
    this.register('posts', Meteor.subscribe('posts', selector));
    */
  },
  action: function() {
    let rSession = new RSession();
    ReactLayout.render(MainLayout, {
      content: <NotebookList />
    });
  }
});

FlowRouter.route("/notebook/:id", {
  subscriptions: function() {},
  action: function(params) {
    let notebookId = params.id;
    let rEnv = rSession.getEnv(notebookId);
    ReactLayout.render(MainLayout, {
      content: <Notebook notebookId={notebookId} env={rEnv}/>
    });
  }
});
