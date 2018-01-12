export class ActiveLesson {
    constructor(instructorId: string, lessons: { _id: string, branch: string[], }) {
        this.instructorId = instructorId;
        this.lessons = lessons;
    }
    lessons: {
        _id: string,
        branch: string[],
    };
    instructorId: string;
}
