FlowRouter.route("/", {
  subscriptions: function() {
    /*
    var selector = {category: {$ne: "private"}};
    this.register('posts', Meteor.subscribe('posts', selector));
    */
  },
  action: function() {
    ReactLayout.render(MainLayout, {
      content: <Notebook />
    });
  }
});
