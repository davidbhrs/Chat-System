export class User {

    /** Class properties */
    id: number;
    name: string;

    /**
     * Constructor
     *
     * @param id   numeric id of the user
     * @param name the user's name
     */
    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
    }
}
