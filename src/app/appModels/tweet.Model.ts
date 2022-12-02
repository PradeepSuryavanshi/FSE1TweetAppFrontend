export class tweet {
    constructor(
        public tweetId: number,
        public message: string,
        public tag: string,
        public postedOn: Date,
        public reply: boolean,
        public likes: number,
        public repliedTo: number,
        public username: string
    ) { }
}