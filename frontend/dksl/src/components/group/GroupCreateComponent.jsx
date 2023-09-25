// Styled
import * as S from '@/styles/group/create.style';
// React
import { useEffect, useRef, useState } from 'react';

const GroupCreateComponent = () => {
  const [src, setSrc] = useState('/image/noimage.png');
  const fileDOM = useRef();

  useEffect(() => {
    document.addEventListener('change', (e) => {
      if (e.target != fileDOM.current) return;
      const imageSrc = URL.createObjectURL(fileDOM.current.files[0]);
      setSrc(imageSrc);
    });

    return URL.revokeObjectURL(fileDOM.current.files[0]);
  }, []);
  return (
    <S.CreateLayout>
      <div className="input-area-1">
        <div className="input-image">
          <S.LabelForFile htmlFor="swal-input">
            <img className="preview" src={src} alt="image upload" />
          </S.LabelForFile>
          <input type="file" id="swal-input" ref={fileDOM} />
        </div>
        <div className="input-title">
          <label htmlFor="swal-input1">소속 이름</label>
          <input
            type="text"
            id="swal-input1"
            placeholder="소속의 이름을 입력해주세요."
          />
        </div>
      </div>
      <div className="input-area-2">
        <div className="input-description">
          <label htmlFor="swal-input2">소속 소개</label>
          <textarea
            id="swal-input2"
            className="input-description"
            placeholder="소속의 소개를 적어주세요."
          />
        </div>
      </div>
    </S.CreateLayout>
  );
};

export default GroupCreateComponent;
