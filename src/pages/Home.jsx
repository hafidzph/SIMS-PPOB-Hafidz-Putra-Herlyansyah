import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import CustomerLayout from "../layout/CustomerLayout";
import ServiceItem from "../components/ServiceItem";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getInformationAsync } from "../features/information/informationThunk";
import { CircularProgress } from "@mui/material";
import { useNavigate } from "react-router";

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { banner, services, loading } = useSelector(
    (state) => state.information
  );

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 4,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  useEffect(() => {
    dispatch(getInformationAsync());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <CircularProgress
          size={60}
          sx={{
            color: "red",
          }}
        />
      </div>
    );
  }

  return (
    <CustomerLayout>
      <div className="flex flex-wrap gap-4 justify-between items-start">
        {services?.map((service) => (
          <ServiceItem
            image={service.service_icon}
            title={service.service_name}
            key={service.service_code}
            onClick={() =>
              navigate(`/services/${service.service_code.toLowerCase()}`)
            }
          />
        ))}
      </div>
      <div className="flex flex-col gap-5 justify-start ">
        <h2 className="text-md font-medium ">Temukan promo menarik </h2>
        <Carousel
          responsive={responsive}
          infinite={true}
          autoPlay={true}
          autoPlaySpeed={3000}
          keyBoardControl={true}
          customTransition="transform 300ms ease-in-out"
          transitionDuration={500}
          containerClass="carousel-container"
          itemClass="mx-1 w-14"
          arrows={false}
          draggable={true}
        >
          {banner?.map((item) => (
            <div key={item.banner_name}>
              <img
                src={item.banner_image}
                alt={item.banner_name}
                className="w-[22rem] h-auto"
                draggable="false"
              />
            </div>
          ))}
        </Carousel>
      </div>
    </CustomerLayout>
  );
}

export default Home;
