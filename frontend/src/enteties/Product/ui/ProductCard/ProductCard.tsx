import { FC, useEffect, useState } from 'react';
import useAxios from '@/shared/lib/hooks/useAxios';
import { useTranslation } from 'react-i18next';

import ProductCardSkeleton from './ProductCardSkeleton';

import { Product } from '@/enteties/Product';
import { getUserAuthData, getUserWishlist, getWishlist } from '@/enteties/User';
import { $api } from '@/shared/api/api';
import heart from '@/shared/assets/icons/heart.svg?react';
import { ApiRoutes } from '@/shared/const/apiEndpoints';
import { getRouteProduct } from '@/shared/const/routes';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector';
import { Button } from '@/shared/ui/Button';
import { Icon } from '@/shared/ui/Icon';
import { Image } from '@/shared/ui/Image';
import { Link } from '@/shared/ui/Link';
import { Skeleton } from '@/shared/ui/Skeleton';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Text, TextColors } from '@/shared/ui/Text';
import { RatingResponse } from '@/pages/ProductPage/model/types';
import { calcAverage } from '@/features/managingFeedbacks/helpers/managingFeedbacksHelpers';
import Star from '@/shared/assets/icons/Star.svg?react';
interface quantityResult {
  text: string;
  color: TextColors;
}

export const quantityCalc = (quantity: number): quantityResult => {
  if (quantity > 5) {
    return {
      text: 'Є в наявності',
      color: 'green',
    };
  }
  if (quantity <= 5 && quantity > 0) {
    return {
      text: 'Закінчується',
      color: 'orange',
    };
  }

  return {
    text: 'Немає в наявності',
    color: 'red',
  };
};

export const countDiscount = (value: number, percentage: number): string => {
  if (percentage === 100) {
    return '';
  }

  return (value - Math.round((value * percentage) / 100)).toFixed(0);
};

interface Props {
  product: Product;
  dark?: boolean;
  dashboard?: boolean;
}

const ProductCard: FC<Props> = (props) => {
  const { t } = useTranslation();

  const { product, dark, dashboard = false } = props;

  const { _id, name, discount, images, price, quantity } = product;

  const [heartIsDisabled, setHeartIsDisabled] = useState(false);

  const dispatch = useAppDispatch();
  const user = useAppSelector(getUserAuthData);

  const { wishlist } = useAppSelector(getWishlist);

  const [rating, setRating] = useState(0);

  const handleWishHeartClick = async () => {
    try {
      if (user) {
        setHeartIsDisabled(true);

        await $api.put(`${ApiRoutes.WISHLIST}/${_id}`);

        dispatch(getUserWishlist({ _id: user._id }));
      }
    } catch (error) {
      // eslint-disable-next-line
      console.error('Error in WishHeartClick:', error);
    } finally {
      setHeartIsDisabled(false);
    }
  };

  // const getProductRating = async () => {
  //   try {
  //     if (_id) {
  //       const response: any = await $api.get(`/feedback/product?productId=${_id}`);
  //       console.log(response.data.current);

  //       setRating(parseFloat((Math.random() * 10).toFixed(1)));
  //     }
  //   } catch (error) {
  //     // eslint-disable-next-line
  //     console.error('Error in WishHeartClick:', error);
  //   }
  // };
  // useEffect(() => {
  //   getProductRating(); // Замість 'your-id' використовуйте фактичний ID
  // }, []);

  const {
    data: productRating,
    isLoading: productRatingIsLoading,
    refetch: refetchRating,
  } = useAxios<RatingResponse>(`${ApiRoutes.PRODUCT_RATINGS}?productId=${_id}`);

  if (!product) {
    return <ProductCardSkeleton />;
  }

  return (
    <HStack
      justify="between"
      className={`relative p-[6px] lg:p-4 rounded-2xl
      ${dashboard ? 'min-w-[132px] min-h-[248px]' : 'min-w-[168px] min-h-[248px]'}
       max-w-[313px] w-full 
       max-h-[445px] h-full
       ${!dark ? 'shadow-custom-base hover:shadow-custom-hover' : 'bg-dark-grey'}  
       duration-75`}
    >
      {images?.length > 0 ? (
        <Link to={getRouteProduct(`${_id}`)}>
          <Image
            loadingFallback={
              <Skeleton
                width="156px"
                height="140px"
                className="lg:!w-[280px] lg:!h-[252px]"
              />
            }
            src={`${images[0]}`}
            alt="product-card-img"
            className={`${dashboard ? 'min-h-[118px] !min-w-[132px]' : 'h-[140px] !min-w-[156px]'} 
            lg:h-[252px] !max-w-[281px] w-full`}
          />
        </Link>
      ) : (
        <Link to={getRouteProduct(`${_id}`)}>
          <Image src="" alt="product-card-img" className="!h-[252px] !w-[281px]" />
        </Link>
      )}

      <div className="mt-2">
        {/* Name */}
        <div className="h-[44px] overflow-hidden">
          <Link to={getRouteProduct(`${_id}`)}>
            <Text
              Tag="span"
              text={name}
              size="xs"
              className={`${dark && 'text-main-white'} lg:text-md text-wrap text-ellipsis`}
            />
          </Link>
        </div>

        {/*  Main price */}
        <VStack gap="1" align="center" className="gap-1 ">
          <Text
            size="xl"
            font="ibm-plex-sans"
            Tag="p"
            text={productRating ? calcAverage(productRating.current).toString() : '0'}
            className={`${dark && 'text-main-white'} font-medium lg:text-4xl`}
          />
          <Icon Svg={Star} width={24} height={24} />
        </VStack>
      </div>

      {/*  Heart Icon */}
      <HStack className="absolute top-[12px] right-[12px] lg:top-[24px] lg:right-[24px]">
        <Button
          variant="clear"
          disabled={heartIsDisabled}
          onClick={() => handleWishHeartClick()}
        >
          <Icon
            Svg={heart}
            className={`${wishlist?.includes(_id) ? 'fill-secondary-yellow' : `!stroke-2 ${dark ? '!stroke-secondary-yellow' : '!stroke-main-dark'}`}  ${heartIsDisabled && 'opacity-40'}`}
          />
        </Button>
      </HStack>
    </HStack>
  );
};

export default ProductCard;
