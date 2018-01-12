export class ActiveLesson {
    constructor(instructorId: String, lessons: { _id: String, branch: String[], }) {
        this.instructorId = instructorId;
        this.lessons = lessons;
    }
    lessons: {
        _id: String,
        branch: String[],
    };
    instructorId: String;
}
