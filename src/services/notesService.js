import http from "./httpService";

    export async function checkUsernameIsAvailable(username) {
        let result = await http.get(`/notes/isUsernameAvailable/${username}`);
        return result;
    }

    export async function saveNoteForUser(username, note){
        let result = await http.put(`/notes/${username}`, note)
        return result;
    }

    export async function deleteNoteByTimeStamp(username, timestamp){
        let result = await http.delete(`/notes/${username}/${timestamp}`)
        return result;
    }
    
    export async function getNotesByUsername(username){
        let result = await http.get(`/notes/${username}`)
        return result;
    }

    export async function getNoteByTimestamp(username, timestamp){
        let result = await http.get(`/notes/${username}/${timestamp}`)
        return result;
    }

