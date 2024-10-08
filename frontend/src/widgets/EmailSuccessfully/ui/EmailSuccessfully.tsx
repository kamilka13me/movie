import { useNavigate } from 'react-router-dom';

import { getRouteProfile } from '@/shared/const/routes';
import { Button } from '@/shared/ui/Button';

const EmailSuccessfully = () => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center pt-[100px] pb-[180px]">
      <div className="w-[343px] md:w-[360px]">
        <h1 className="flex justify-center text-[24px] md:text-[32px] mb-[32px] font-medium md:mb-[40px]">
          Вітаємо!
        </h1>
        <p className="flex justify-center text-[16px] text-main-dark mb-[20px] md:text-[18px] font-normal">
          Ви успішно підтвердили свій профіль.
        </p>
        <Button
          variant="primary"
          className="w-full self-center md:self-start font-normal text-[18px]"
          onClick={() => {
            navigate(getRouteProfile('info'));
          }}
        >
          Перейти в кабінет
        </Button>
      </div>
    </div>
  );
};

export default EmailSuccessfully;
