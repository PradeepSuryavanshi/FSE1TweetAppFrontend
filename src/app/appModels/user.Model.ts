export class user {
    constructor(
        public firstName: string,
        public lastName: string,
        public gender: string,
        public dateOfBirth: Date,
        public email: string,
        public contactNumber: string,
        private _token: string,
        private _tokenExpirationDate: Date
    ) { }

    get token() {
        if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
            return null
        }
        else {
            return this._token;
        }

    }
}