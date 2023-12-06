import Database from "../Database/index.js";

function ModuleRoutes(app) {

    // GET all modules in a course
    app.get("/api/courses/:cid/modules", (req, res) => {
        const { cid } = req.params;
        // console.log(JSON.stringify(Database.modules))
        const modules = Database.modules
            .filter((m) => m.course === cid);
        res.send(modules);
    });

    // POST new module to a course
    app.post("/api/courses/:cid/modules", (req, res) => {
        const { cid } = req.params;
        const newModule = {
            ...req.body,
            course: cid,
            _id: new Date().getTime().toString(),
        };
        Database.modules.push(newModule);
        res.send(newModule);
    });

    // DELETE module
    app.delete("/api/modules/:mid", (req, res) => {
        const { mid } = req.params;
        Database.modules = Database.modules.filter((m) => m._id !== mid);
        res.sendStatus(200);
    });

    // PUT update a module
    app.put("/api/modules/:mid", (req, res) => {
        const { mid } = req.params;
        const moduleIndex = Database.modules.findIndex(
            (m) => m._id === mid);
            Database.modules[moduleIndex] = {
            ...Database.modules[moduleIndex],
            ...req.body
        };
        res.sendStatus(204);
    });



}

export default ModuleRoutes;