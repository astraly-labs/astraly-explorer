import FaqItem from "./FaqItem";

const FaqBlock = () => {
  return (
    <div className="g-container">
      <h2 className="t-block-title ui-t-dark">FAQ</h2>
      <div className="max-w-[1233px]">
        <FaqItem question="Who can mint ? ">
          Everyone filling the requirements can mint the badge.
        </FaqItem>
        <FaqItem question="Why mint ?">Test 124</FaqItem>
      </div>
    </div>
  );
};

export default FaqBlock;
