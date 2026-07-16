function FuelSection() {
  return (
    <section className="bg-[#f2f2f2] py-20 px-6 md:px-16">
      <div className="max-w-6xl mx-auto">

        <h3 className="text-3xl font-light mb-8">
          Fuel consumption and CO2 emissions.
        </h3>

        <div className="text-sm text-gray-700 leading-relaxed space-y-4">

          <p>
            (1) Range depends on various factors, in particular: individual driving style, route characteristics, outside temperature, heating/air conditioning, pre-conditioning.
          </p>

          <p>
            (2) For plug-in hybrid: Weighted, combined (EC AC Charge Weighted)
          </p>

          <p>
            (3) Composed of combustion engine drive 430 kW / 750 Nm and electric drive up to 145 kW / 280 Nm. Electric drive depending on battery charging level.
          </p>

          <p>
            (4) For plug-in hybrid: Electric drive depending on battery charging level.
          </p>

          <p>
            (5) Material-specific properties can cause increased function-related noises when braking...
          </p>

          <p>
            (6) For plug-in hybrid: At temperatures below freezing, the fully electric drive system is only available after a few kilometres of driving.
          </p>

        </div>

        <ul className="mt-10 text-sm text-gray-700 space-y-3 list-disc pl-5">
          <li>
            The models, equipment and possible vehicle configurations illustrated on the website may differ.
          </li>
          <li>
            The BMW Secure Advance is complimentary to customers for the first year.
          </li>
          <li>
            The prices are exclusive of applicable taxes and statutory levies.
          </li>
          <li>
            For detailed Terms & Conditions please refer to brochure.
          </li>
          <li>
            The Extended Warranty is brought to you by BMW India Financial Services Pvt. Ltd.
          </li>
        </ul>

      </div>
    </section>
  );
}

export default FuelSection;