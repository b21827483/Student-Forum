import {hash, compare} from 'bcrypt'

export async function hashPassword(password) {
    let pw = password.toString();
    return await hash(pw, 10);

}
export async function comparePassword(pw, hashedPw) {
    console.log(hashedPw)
    return await compare(pw, hashedPw);
}