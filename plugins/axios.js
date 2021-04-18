export default function({$axios, redirect, store}){

    $axios.interceptors.request.use(request => {
        if(store.getters['user/isAuthenticated'] && !request.headers.common['Authorization']){
            const token = store.getters['user/token']
            request.headers.common['Authorization'] = `Bearer ${token}`
        }
        return request
    })
}

