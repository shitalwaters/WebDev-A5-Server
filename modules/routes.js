import db from "../Database/index.js";

function ModuleRoutes(app) {

    // GET all modules in a course
    app.get("/api/courses/:cid/modules", (req, res) => {
        const { cid } = req.params;
        // console.log(JSON.stringify(db.modules))
        const modules = db.modules
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
        db.modules.push(newModule);
        res.send(newModule);
    });

    // DELETE module
    app.delete("/api/modules/:mid", (req, res) => {
        const { mid } = req.params;
        db.modules = db.modules.filter((m) => m._id !== mid);
        res.sendStatus(200);
    });

    // PUT update a module
    app.put("/api/modules/:mid", (req, res) => {
        const { mid } = req.params;
        const moduleIndex = db.modules.findIndex(
            (m) => m._id === mid);
        db.modules[moduleIndex] = {
            ...db.modules[moduleIndex],
            ...req.body
        };
        res.sendStatus(204);
    });



}

export default ModuleRoutes;