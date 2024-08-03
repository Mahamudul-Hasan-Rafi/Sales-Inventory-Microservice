import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { Products } from './routes/Products';
import { ProductCreate } from './routes/ProductCreate';
import { Order } from './routes/Order';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Products/>}/>
        <Route path="/create" element={<ProductCreate/>}/>
        <Route path="/order" element={<Order/>}/>
      </Routes>
    </BrowserRouter>

    // <div className='App'>
    //   <header class="navbar sticky-top bg-dark flex-md-nowrap p-0 shadow" data-bs-theme="dark">
    //     <a class="navbar-brand col-md-3 col-lg-2 me-0 px-3 fs-6 text-white" href="#">Company name</a>



    //     {/* <div className="navbar-nav">
    //       <div className='nav-item text-nowrap'>
    //         <a className='nav-link px-3' href="#">Sign out</a>
    //       </div>
    //     </div> */}
    //   </header>

    //   <div class="container-fluid">
    //     <div class="row">
    //       <div class="sidebar border border-right col-md-3 col-lg-2 p-0 bg-body-tertiary">
    //         <div class="offcanvas-md offcanvas-end bg-body-tertiary" tabindex="-1" id="sidebarMenu" aria-labelledby="sidebarMenuLabel">
    //           <div class="offcanvas-header">
    //             <h5 class="offcanvas-title" id="sidebarMenuLabel">Company name</h5>
    //             <button type="button" class="btn-close" data-bs-dismiss="offcanvas" data-bs-target="#sidebarMenu" aria-label="Close"></button>
    //           </div>
    //           <div class="offcanvas-body d-md-flex flex-column p-0 pt-lg-3 overflow-y-auto">
    //             <ul class="nav flex-column">
    //               <li class="nav-item">
    //                 <a class="nav-link d-flex align-items-center gap-2 active" aria-current="page" href="#">
    //                   Dashboard
    //                 </a>
    //               </li>
    //             </ul>
    //           </div>
    //         </div>
    //       </div>

    //       <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
    //         <div class="table-responsive small">
    //           <table class="table table-striped table-sm">
    //             <thead>
    //               <tr>
    //                 <th scope="col">#</th>
    //                 <th scope="col">Header</th>
    //                 <th scope="col">Header</th>
    //                 <th scope="col">Header</th>
    //                 <th scope="col">Header</th>
    //               </tr>
    //             </thead>
    //             <tbody>
    //               <tr>
    //                 <td>1,001</td>
    //                 <td>random</td>
    //                 <td>data</td>
    //                 <td>placeholder</td>
    //                 <td>text</td>
    //               </tr> 
    //             </tbody>
    //           </table>
    //         </div>
    //       </main>
    //     </div>
    //   </div>
    // </div>
  );
}

export default App;
