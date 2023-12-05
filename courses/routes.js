import Database from "../Database/index.js";

function CourseRoutes(app) {

    // GET all courses
    app.get("/api/courses", (req, res) => {
        const courses = Database.courses;
        res.send(courses);
    });

    // GET one course by id
    app.get("/api/courses/:id", (req, res) => {
        const { id } = req.params;
        // console.log("courses: " + JSON.stringify(Database.courses))
        // console.log("id = " + id)
        const course = Database.courses.find((course) => course._id === id);
        if (!course) {
            res.status(404).send("Course not found");
            return;
        }
        res.json(course);
    });

    //POST new course
    app.post("/api/courses", (req, res) => {
        const course = {
            ...req.body,
            number: "RS" + Math.floor(Math.random() * 9999).toString(),
            _id: new Date().getTime().toString()
        };
        Database.courses.push(course);
        res.json(course);
    });

    //DELETE a course
    app.delete("/api/courses/:id", (req, res) => {
        const { id } = req.params;
        Database.courses = Database.courses
            .filter((c) => c._id !== id);
        res.sendStatus(204);
    });

    //PUT edit a course
    app.put("/api/courses/:id", (req, res) => {
        const { id } = req.params;
        const course = req.body;
        Database.courses = Database.courses.map((c) =>
            c._id === id ? { c, ...course } : c
        );
        res.sendStatus(204);
    });


}

export default CourseRoutes;