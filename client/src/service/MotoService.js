import axios from 'axios'

class MotoService {

    constructor() {
        this.service = axios.create({
            baseURL: `${process.env.REACT_APP_API_URL}`,
            withCredentials: true
        })
    }

    getAllMotorbikes = () => this.service.get('/motorbikes')

}

export default MotoService