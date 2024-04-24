
const PUBLIC_KEY="pk_test_51P97Sg04u05hAKICDRl7WfZOhCdLPb0Qm8F90WR6Y13JWNC9Q1HlHokygREuzKSSsbknXiQobUV3mjp1ei2F52gO00FnQzkgAf"
import {loadStripe} from "@stripe/stripe-js"
import {Elements} from "@stripe/react-stripe-js"
import PaymentForm from "./PaymentForm"

const stripeTestPromise = loadStripe(PUBLIC_KEY)

const StripeContainer = ({total,order,user,date}) => {
  return (
    <Elements stripe={stripeTestPromise}>
      <PaymentForm date={date} user={user} order={order} total={total}/>

    </Elements>
  )
}

export default StripeContainer
