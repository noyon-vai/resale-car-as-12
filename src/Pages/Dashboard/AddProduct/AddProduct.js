import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Title from "../../../components/Title/Title";
import { AuthContext } from "../../../context/AuthProvider";

const AddProduct = () => {
    const [userRole, setUserRole] = useState('good');
    const places = ['Kushtia', 'Dhaka', 'Rajsahi', 'Khulna', 'Rongpur', 'BandorBan', 'Noakhali'];
    const {user} = useContext(AuthContext)
    const imageApi = process.env.REACT_APP_imgbb_key
    const navigate = useNavigate()
//
    const handleUser=(e)=>{
        setUserRole(e.target.value)
      }

      const handleAddProduct = event => {
        event.preventDefault();
    

        const form = event.target;
        const name = form.productName.value;
        const sellerName = form.sellerName.value;
        const price = form.marketPrice.value;
        const resalePrice = form.resalePrice.value;
        const contact = form.contactNumber.value;
        const use = form.useDays.value;
        const categoryId = form.category.value;
        const location = form.location.value;
        let image = form.image.files[0];
        const quality = userRole;
        const details = form.details.value;
        const email = user.email;
        const time = new Date();

        console.log(time)
         
       
       



        const formData = new FormData();
        formData.append("image", image)

        

        fetch(`https://api.imgbb.com/1/upload?&key=${imageApi}`, {
            method: 'POST',
            body: formData
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            if(data.success){
               let image = data.data.display_url;
               
               const productData = {
                name, 
                sellerName,
                price, 
                resalePrice, 
                contact,
                use, 
                image,
                categoryId,
                location,
                quality, 
                details,
                email,
                time
            }
            
        fetch(`https://resale-server-two.vercel.app/category`, {
            method: 'POST',
            headers: {
              'content-type' : 'application/json'
            },
            body: JSON.stringify(productData)
          })
          .then(res => res.json())
          .then(data => {
            if(data.acknowledged){
             form.reset()
             toast.success('Product add successfully')
             navigate('/dashboard/my-product')
            }
            console.log(data)        
          })

            }
        })
        
      

       
      }


  return (
    <div className="bg-[#f2f2f2]  p-10">
      <Title>Add New Product</Title>

      <form className="mt-10" onSubmit={handleAddProduct}>
        <div className="grid gird-cols1 md:grid-cols-2 gap-x-4 mb-5">
      <div className="form-control">
            <label className="label">
              <span className="label-text">Product Name</span>
            </label>
            <input
              type="text"
              placeholder="Product Name"
              name="productName"
              className="input input-bordered "
              required
            />
          </div>
      <div className="form-control">
            <label className="label">
              <span className="label-text">Seller Name</span>
            </label>
            <input
              type="text"
              value={user?.displayName}
              placeholder="Seller Name"
              name="sellerName"
              className="input input-bordered "
              required
            />
          </div>
          </div>
        <div className="grid gird-cols1 md:grid-cols-2 gap-x-4 mb-5">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Market Price</span>
            </label>
            <input
              type="text"
              placeholder="This Product Market Price"
              name="marketPrice"
              className="input input-bordered "
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Product Price</span>
            </label>
            <input
              type="text"
              placeholder="Product Price"
              name="resalePrice"
              className="input input-bordered"
              required
            />
          </div>
        </div>
        
        <div className="grid gird-cols1 md:grid-cols-2 gap-x-4 mb-10">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Mobile Number</span>
            </label>
            <input
              type="text"
              placeholder="Contact Number"
              name="contactNumber"
              className="input input-bordered "
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Years of use</span>
            </label>
            <input
              type="text"
              placeholder="Years Of Use"
              name="useDays"
              className="input input-bordered"
              required
            />
          </div>
        </div>
        <div className="grid gird-cols1 md:grid-cols-2 gap-x-4 mb-10">
          <div className="form-control">
          <select className="select select-secondary w-full mb-5" name="category" required>
            <option disabled selected>Product Category</option>
            <option value='bmw'>BMW</option>
            <option value='hyundai'>Hyundai</option>
            <option value='marcedes'>Marcedes</option>
            
            </select>
            
          </div>
          <div className="form-control">
          <select className="select select-secondary w-full" name="location" required>
            <option disabled selected>Select Location</option>
           
            {
                places.map((place, i) => <option value={place} key={i}>{place}</option> )
            }
            
            </select>
          </div>
        </div>
        <div className="grid gird-cols1 md:grid-cols-2 gap-x-4 mb-10">
          <div className="form-control">

          <input type="file" className="file-input file-input-bordered w-full mb-5" name="image" required/>
            
          </div>
          <div className="form-control -mt-1">
          <label className="label">
              <span className="label-text">Product Condition</span>
            </label>
            <div className="flex gap-x-5 ">
             <div className="flex items-center gap-x-3">
              <input type="radio" name="role" id='excellent' value="excellent" className="radio radio-primary" onChange={handleUser}  required 
              checked={userRole === 'excellent'} />
             <label htmlFor="excellent"> Excellent</label>
              </div>

              <div className="flex items-center gap-x-3">
              <input type="radio" name="role" id="good" value="good" className="radio radio-primary" onChange={handleUser} required  checked={userRole === 'good'}/>
            <label htmlFor="good">Good</label>
              </div>

              <div className="flex items-center gap-x-3">
              <input type="radio" name="role" id="fair" value="fair" className="radio radio-primary" onChange={handleUser} required  checked={userRole === 'fair'}/>
            <label htmlFor="fair">Fair</label>
              </div>
              </div>
          </div>
        </div>
          <div>
          <textarea className="textarea textarea-bordered w-full" placeholder="Product Details" name="details" required></textarea>
          </div>
          <button type="submit" className="btn btn-error px-10 text-center mt-7">Submit</button>
      </form>
    </div>
  );
};

export default AddProduct;
