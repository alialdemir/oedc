export class Curriculum {
    constructor(name: string, isActive: boolean, curriculumId?: number) {
        this.curriculumId = curriculumId;
        this.name = name;
        this.isActive = isActive;
    }
    curriculumId: number;
    name: string;
    isActive: boolean;
}
