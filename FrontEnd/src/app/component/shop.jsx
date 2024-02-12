/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ProductForm from './product-form'
import DeleteConfirmationDialog from './delete-confirmationd-dialog'
import '../css/shop'

const Shop = ({ admin, onProductClicked }) => {
    const [jsonData, setJsonData] = useState([])
    const [sizes, setSizes] = useState([])
    const [selectedSize, setSelectedSize] = useState('')
    const [brands, setBrands] = useState([])
    const [selectedBrand, setSelectedBrand] = useState('')
    const [colors, setColors] = useState([])
    const [selectedColor, setSelectedColor] = useState('')
    const [seasons, setSeasons] = useState([])
    const [selectedSeason, setSelectedSeason] = useState('')
    const [sortedProducts, setSortedProducts] = useState([])
    const [searchValue, setSearchValue] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [editingProduct, setEditingProduct] = useState(null)
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false)
    const [productName, setProductName] = useState(null)
    const [productToDelete, setProductToDelete] = useState(null)

    useEffect(() => {
        axios({
            method: 'post',
            url: 'http://localhost:8888/Backend/ServerSender/retournerProduits',
            timeout: 4000
        })
            .then((response) => {
                const products = response.data
                setJsonData(products)

                const allSizes = products.map((product) => product.taille)
                const uniqueSizes = [...new Set(allSizes)]
                setSizes(uniqueSizes)

                const allBrands = products.map((product) => product.marque)
                const uniqueBrands = [...new Set(allBrands)]
                setBrands(uniqueBrands)

                const allColors = products.map((product) => product.couleur)
                const uniqueColors = [...new Set(allColors)]
                setColors(uniqueColors)

                const allSeasons = products.map((product) => product.saison)
                const uniqueSeasons = [...new Set(allSeasons)]
                setSeasons(uniqueSeasons)

                setSortedProducts(products)
                setIsAdmin(admin)
            })
            .catch((error) => {
                console.error('Error fetching data:', error)
            })
    }, [])

    useEffect(() => {
        handleSortClick()
    }, [jsonData, searchValue, selectedSize, selectedBrand, selectedColor, selectedSeason])

    const handleSizeChange = (event) => {
        setSelectedSize(event.target.value)
    }

    const handleBrandChange = (event) => {
        setSelectedBrand(event.target.value)
    }

    const handleColorChange = (event) => {
        setSelectedColor(event.target.value)
    }

    const handleSeasonChange = (event) => {
        setSelectedSeason(event.target.value)
    }

    const handleSearchChange = (event) => {
        setSearchValue(event.target.value)
    }

    const handleSortClick = () => {
        let filteredProducts = jsonData

        if (searchValue.trim() !== '') {
            filteredProducts = filteredProducts.filter((product) =>
                product.nom.toLowerCase().includes(searchValue.toLowerCase())
            )
        }

        if (selectedSize) {
            filteredProducts = filteredProducts.filter(
                (product) => product.taille === selectedSize
            )
        }

        if (selectedBrand) {
            filteredProducts = filteredProducts.filter(
                (product) => product.marque === selectedBrand
            )
        }

        if (selectedColor) {
            filteredProducts = filteredProducts.filter(
                (product) => product.couleur === selectedColor
            )
        }

        if (selectedSeason) {
            filteredProducts = filteredProducts.filter(
                (product) => product.saison === selectedSeason
            )
        }

        setSortedProducts(filteredProducts)
    }

    const resetFilters = () => {
        setSelectedSize('')
        setSelectedBrand('')
        setSelectedColor('')
        setSelectedSeason('')
        setSearchValue('')
        setSortedProducts(jsonData)
    }

    const handleDeleteProduct = (productId, nom) => {
        setProductToDelete(productId)
        setProductName(nom)
        setShowDeleteConfirmation(true)
    }

    const handleConfirmDelete = () => {
        if (productToDelete) {
            axios({
                method: 'post',
                url: 'http://localhost:8888/Backend/ServerSender/supprimerProduits',
                timeout: 4000,
                data: { product_id: productToDelete }
            })
                .then(() => {
                    axios({
                        method: 'post',
                        url: 'http://localhost:8888/Backend/ServerSender/retournerProduits',
                        timeout: 4000
                    })
                        .then((response) => {
                            const products = response.data
                            setJsonData(products)
                            setSortedProducts(products)
                        })
                        .catch((error) => {
                            console.error('Error fetching data:', error)
                        })
                })
                .catch((error) => {
                    console.error('Error deleting product:', error)
                })
        }

        setProductToDelete(null)
        setShowDeleteConfirmation(false)
    }

    const handleEditProduct = (product) => {
        setIsEditing(true)
        setEditingProduct(product)
    }

    const handleCreateProduct = () => {
        setIsEditing(true)
        setEditingProduct(null)
    }

    const handleSaveProduct = () => {
        axios({
            method: 'post',
            url: 'http://localhost:8888/Backend/ServerSender/retournerProduits',
            timeout: 4000
        })
            .then((response) => {
                const products = response.data
                setJsonData(products)
                setSortedProducts(products)
            })
            .catch((error) => {
                console.error('Error fetching data:', error)
            })

        setIsEditing(false)
        setEditingProduct(null)
    }

    const handleCancelProduct = () => {
        setIsEditing(false)
        setEditingProduct(null)
        setSelectedSize('')
        setSelectedBrand('')
        setSelectedColor('')
        setSelectedSeason('')
        setSearchValue('')
        setSortedProducts(jsonData)
    }

    const handleProductClicked = (productId) => {
        onProductClicked(productId)
    }

    const renderProducts = () => {
        if (sortedProducts.length === 0) {
            return <p>Aucun produit trouvé.</p>
        }

        return (
            <div className='shop-listeproduits'>
                <ul>
                    {sortedProducts.map((product) => (
                        <li key={product.product_id} onClick={isAdmin ? () => null : () => handleProductClicked(product.product_id)}>
                            <div>
                                <img src={product.image} alt='img' />
                            </div>
                            <div>
                                {product.nom}
                            </div>
                            <div>
                                {product.prix + '$'}
                            </div>
                            {isAdmin && (
                                <div>
                                    <button onClick={() => handleDeleteProduct(product.product_id, product.nom)}>
                                        Supprimer
                                    </button>
                                    <button onClick={() => handleEditProduct(product)}>
                                        Modifier
                                    </button>
                                </div>
                            )}
                        </li>

                    ))}
                </ul>
                {isAdmin && (
                    <div>
                        <button onClick={() => handleCreateProduct()}>
                            Créer
                        </button>
                    </div>
                )}
            </div>
        )
    }

    return (
        <div className='shop-listeproduitglobal'>
            {!isEditing && (
                <>
                    <div className='shop-listeproduitdiv'>
                        <input
                            type='text'
                            placeholder='Rechercher...'
                            value={searchValue}
                            onChange={handleSearchChange}
                        />

                        <select id='sizeSelect' value={selectedSize} onChange={handleSizeChange}>
                            <option value=''>TAILLE</option>
                            {sizes.map((size) => (
                                <option key={size} value={size}>
                                    {size}
                                </option>
                            ))}
                        </select>

                        <select id='brandSelect' value={selectedBrand} onChange={handleBrandChange}>
                            <option value=''>MARQUE</option>
                            {brands.map((brand) => (
                                <option key={brand} value={brand}>
                                    {brand}
                                </option>
                            ))}
                        </select>

                        <select id='colorSelect' value={selectedColor} onChange={handleColorChange}>
                            <option value=''>COULEUR</option>
                            {colors.map((color) => (
                                <option key={color} value={color}>
                                    {color}
                                </option>
                            ))}
                        </select>

                        <select id='seasonSelect' value={selectedSeason} onChange={handleSeasonChange}>
                            <option value=''>SAISON</option>
                            {seasons.map((season) => (
                                <option key={season} value={season}>
                                    {season}
                                </option>
                            ))}
                        </select>

                        <button onClick={resetFilters}>
                            Réinitialiser
                        </button>
                    </div>

                    {renderProducts()}
                </>
            )}

            {isEditing && (
                <ProductForm
                    productDetails={editingProduct}
                    onSave={handleSaveProduct}
                    onCancel={handleCancelProduct}
                    seasons={seasons}
                    colors={colors}
                    sizes={sizes}
                />
            )}

            {showDeleteConfirmation && (
                <DeleteConfirmationDialog
                    productName={productName}
                    onConfirm={handleConfirmDelete}
                    onCancel={() => setShowDeleteConfirmation(false)}
                />
            )}
        </div>
    )
}

export default Shop
