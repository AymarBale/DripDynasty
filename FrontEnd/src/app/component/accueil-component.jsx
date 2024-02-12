import React, { useState, useEffect } from 'react'
import axios from 'axios'
import '../css/accueil'

const Accueil = ({ onProductClicked }) => {
    const [jsonData, setJsonData] = useState([])
    useEffect(() => {
        axios({
            method: 'post',
            url: 'http://localhost:8888/Backend/ServerSender/retournerProduits',
            // eslint-disable-next-line comma-dangle
            timeout: 4000,
        })
            .then((response) => {
                const products = response.data
                setJsonData(products)
            })
            .catch((error) => {
                console.error('Error fetching data:', error)
            })
    }, [])

    const handleProductClicked = (productId) => {
        onProductClicked(productId)
    }

    return (
        <div className='accueilbody'>
            <div className='imagebasecontainer'>
                <h2>Unbelievable</h2>
                <h4>Quality.Comfort.</h4>
                <div className='div1'>
                    <img className='img1' src='../img/BaseShirt.jpg' alt='Base Shirt' />
                </div>
                <div className='div2'>
                    <img className='img1' src='../img/BasePants.jpg' alt='Base Pants' />
                </div>
                <div className='div3'>
                    <img className='img3' src='../img/BaseShoes.jpg' alt='Base Shoes' />
                </div>
            </div>
            <div className='lineargrad'>
                <div className='popularcontainer'>
                    <h3 className='ventespop'>Ventes populaires</h3>
                    <div className='popcontainer'>
                        {jsonData.slice(0, 4).map((product, index) => (
                            <div className='popular' key={index}>
                                <img
                                    className='imgpopular'
                                    src={product.image}
                                    alt={product.name}
                                />
                                <img
                                    className='blackline'
                                    src='../img/blackline.png'
                                    alt='Black Line'
                                />
                                <p>{product.description}</p>
                                <button className='detailaccueil' onClick={() => handleProductClicked(product.product_id)}>Détails</button>
                            </div>
                        ))}
                    </div>
                </div>
                <div className='quatreinfoscontainer'>
                    <div className='infoscontainer'>
                        <img className='quatreinfos' src='../img/01.png' alt='Info 01' />
                        <div>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias
                            expedita ad ullam quas, velit sint quibusdam nulla eos vitae
                            voluptatem neque enim accusantium maiores, id voluptate voluptates
                            suscipit delectus aliquid!
                        </div>
                    </div>
                    <div className='infoscontainer'>
                        <img className='quatreinfos' src='../img/02.png' alt='Info 02' />
                        <div>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias
                            expedita ad ullam quas, velit sint quibusdam nulla eos vitae
                            voluptatem neque enim accusantium maiores, id voluptate voluptates
                            suscipit delectus aliquid!
                        </div>
                    </div>
                    <div className='infoscontainer'>
                        <img className='quatreinfos' src='../img/03.png' alt='Info 03' />
                        <div>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias
                            expedita ad ullam quas, velit sint quibusdam nulla eos vitae
                            voluptatem neque enim accusantium maiores, id voluptate voluptates
                            suscipit delectus aliquid!
                        </div>
                    </div>
                    <div className='infoscontainer'>
                        <img className='quatreinfos' src='../img/04.png' alt='Info 04' />
                        <div>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias
                            expedita ad ullam quas, velit sint quibusdam nulla eos vitae
                            voluptatem neque enim accusantium maiores, id voluptate voluptates
                            suscipit delectus aliquid!
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

// eslint-disable-next-line eol-last
export default Accueil