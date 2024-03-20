import {hash, compare} from 'bcrypt'

export function hashPassword(password) {
    return hash(password, 10);

}
export async function comparePassword(pw, hashedPw) {
    return await compare(pw, hashedPw);
}