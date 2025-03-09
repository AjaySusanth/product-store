import { sql } from "../config/db.js"

export const getProducts = async(req,res) =>{
    try {
        const products = await sql`
            SELECT * FROM products
            ORDER BY created_at DESC
        `
        if(products.length === 0) {
            return res.status(400).json({success:false,message:"No products available"})
        }

        return res.status(200).json({success:true,data:products})
    } catch (error) {
        console.error("Error in get products",error)
        res.status(500).json({success:false,message:"Unexpected server error"})
    }
}

export const getProduct = async(req,res) =>{
    try {
        const {id} = req.params

        const product = await sql`
            SELECT * FROM products
            WHERE id=${id}
        `

        if(product.length === 0) {
            return res.status(404).json({success:false,message:"Product not found"})
        }

        return res.status(200).json({success:true,data:product[0]})

    } catch (error) {
        console.error("Error in get product",error)
        res.status(500).json({success:false,message:"Unexpected server error"})
    }
}

export const createProduct = async(req,res) => {

    try {
        const  {name,img,price} = req.body

        if(!name || !img || !price) {
            return res.status(400).json({success:false,message:"All fileds are required"})
        }

        const newProduct = await sql`
            INSERT INTO products (name,img,price) 
            VALUES (${name},${img},${price})
            RETURNING *
        `
        return res.status(201).json({success:true,data:newProduct[0]})

    } catch (error) {
        console.error("Error in create product",error)
        res.status(500).json({success:false,message:"Unexpected server error"})
    }
}


export const updateProduct = async(req,res) => {

    try {
        const {id} = req.params
        const  {name,img,price} = req.body

        if(!name || !img || !price) {
            return res.status(400).json({success:false,message:"All fileds are required"})
        }

        const updatedProduct = await sql`
            UPDATE products
            SET name = ${name}, img = ${img}, price = ${price}
            WHERE id = ${id}
            RETURNING *
        `

        if(updatedProduct.length === 0) {
            return res.status(404).json({success:false,message:"Product not found"})
        }

        return res.status(200).json({success:true,data:updatedProduct[0]})
    } catch (error) {
        console.error("Error in update product",error)
        res.status(500).json({success:false,message:"Unexpected server error"})
    }

}

export const deleteProduct = async(req,res)=>{
    try {
        const {id} = req.params

        const deletedProduct = await sql`
        DELETE FROM products WHERE id = ${id}
        RETURNING *
        `

        if(deletedProduct.length === 0) {
            return res.status(404).json({success:false,message:"Product not found"})
        }

        return res.status(200).json({success:true,data:deletedProduct[0]})


    } catch (error) {
        console.error("Error in delete product",error)
        res.status(500).json({success:false,message:"Unexpected server error"})
    }
}
