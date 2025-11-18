import MobileBottomNav from "../components/MobileBottomNav";
import ContactUs from "../components/ContactUs";
import FAQContainer from "../components/FAQContainer";
import SEO from "../components/SEO";
const Contact = () => {
  return (
    <>
      <SEO
        title={"Affordable Quality Products in Ghana"}
        description={`Contact Goodlucks for the best quality products in Ghana`}
        keywords={`contact us, reach us, on whatsapp`}
      />
      <MobileBottomNav />
      <ContactUs />
      <FAQContainer />
    </>
  );
};

export default Contact;
