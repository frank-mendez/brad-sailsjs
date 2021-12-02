/**
 * ArticlesController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  list: async (req, res) => {
    try {
      let articles = await Articles.find({});
      res.view("pages/list", { articles });
    } catch (error) {
      res.serverError(error);
    }
  },
  add: (req, res) => {
    res.view("pages/add");
  },
  create: async (req, res) => {
    const title = req.body.title;
    const body = req.body.body;
    try {
      await Articles.create({ title, body }).fetch();
      res.redirect("/articles/list");
    } catch (error) {
      res.send(500, { error: "Database error" });
    }
  },
  delete: async (req, res) => {
    const id = req.param("id");
    try {
      await Articles.destroyOne({ id });
      res.redirect("/articles/list");
    } catch (error) {
      res.send(500, { error });
    }
  },
  edit: async (req, res) => {
    const id = req.param("id");
    try {
      const article = await Articles.findOne({ id });
      res.view("pages/edit", { article });
    } catch (error) {
      res.send(500, { error });
    }
  },
  update: async (req, res) => {
    const title = req.body.title;
    const body = req.body.body;
    const id = req.body.id;
    try {
      await Articles.updateOne({ id }).set({ title, body });
      res.redirect("/articles/list");
    } catch (error) {
      res.send(500, { error });
    }
  },
};
