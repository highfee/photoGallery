import {useState, useEffect} from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'



function Gallery() {
    // let API_KEY = '563492ad6f917000010000016ba678d77d424558ad2eebb3e4fbd2eb'
    let API_KEY = '563492ad6f91700001000001aef7f7510370476eb56e32da963a2943'
    let [perPage, setPerPage] = useState(12)
    // let perPage = 12

    let [url, setUrl] = useState(`https://api.pexels.com/v1/curated?per_page=${perPage}`) 
    let [loading, setLoading] = useState(false)
    let [photos, setPhotos] = useState([])
    let storeText = useSelector(state => state.text)
    let user = useSelector(state => state.user.value)
    let navigate = useNavigate()
    
   
    
    if(user === null){navigate('/login')}
    
    // useSelector(state => state.searchText)
    async function fetchImages(){
        try {
            let res = await fetch(url, {
                method: 'GET',
                headers:{
                    Accept: 'application/json',
                    Authorization: API_KEY
                }
            })
            let data = await res.json()
            setPhotos(data.photos)
            console.log(data.photos);
            setLoading(true)
        } catch (error) {
            toast.error('Pls check internet connection and reload')
        }
         
    }
    useEffect(() => {
        fetchImages()
    }, [url, perPage])

    useEffect(() => {
        setPhotos([])
        setPerPage(12)
        if(storeText.value.length > 0){
            setUrl(`https://api.pexels.com/v1/search?query=${storeText.value}&per_page=${perPage}`)
        }
        setLoading(false)
    }, [storeText])


    
   
  
    function loadMore() {
        if(storeText.value.length > 0){
            setPerPage(perPage + 12)
            setUrl(`https://api.pexels.com/v1/search?query=${storeText.value}&per_page=${perPage + 12}`)
            console.log(perPage);
        }else{
            setPerPage(perPage + 12)
            setUrl(`https://api.pexels.com/v1/curated?per_page=${perPage + 12}`)
            console.log(perPage);
        }
    
        setLoading(false)
    }
    return (
        <>
            
            <div className='gallery'>
                {
                    photos.map((photo) => {
                        return (
                            <a href={photo.src.original}  key={photo.id} download>
                                <div className="item" >
                                    <img src={photo.src.medium} alt="" />
                                    <h3>
                                    <span>{photo.photographer}</span><br />
                                    <a href='https://pexels.com'>Credit: Pexels</a>
                                    </h3>
                                </div>
                            </a>
                            
                        )
                    })
                }
            </div> 
            <button
                    type='button' 
                    className="load-more" 
                    data-img="curated"
                    onClick={loadMore}
            >
                {loading ? 'Load More' : 'Loading....'}
            </button>
        </>
        
    )
}

export default Gallery