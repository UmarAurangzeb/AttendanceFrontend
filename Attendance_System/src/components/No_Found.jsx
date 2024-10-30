import '../Styles/errorPage.css'

function NotFoundPage() {
  return ( 
    <div className="MyContainer">
      <div className="MyBox" style={{textAlign: "center", marginTop: "20px"}}>
        <div className="h404" >404</div>
        <div class="lead">Are you lost, little one?</div>
      </div>
    </div>
   );
}

export default NotFoundPage;