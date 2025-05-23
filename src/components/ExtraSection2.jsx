import React from "react";

const ExtraSection2 = () => {
  return (
    <div>
      <section className="bg-orange-50 w-11/12 mx-auto rounded-lg mt-16 py-16 px-6 sm:px-10">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Meet Our Featured <span className="text-rose-500">Chefs</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-10">
            These culinary artists contribute amazing recipes and help you cook
            like a pro.
          </p>

          <div className="grid md:grid-cols-3 gap-10">
            {/* Chef 1 */}
            <div className="bg-white p-6 rounded-xl shadow text-center">
              <img
                src="https://i.pravatar.cc/150?img=32"
                alt="Chef A"
                className="w-24 h-24 mx-auto rounded-full mb-4"
              />
              <h4 className="text-xl font-semibold text-gray-800">
                Chef Ayesha Rahman
              </h4>
              <p className="text-gray-500 text-sm">
                Expert in Bengali & South Asian cuisine
              </p>
            </div>
            {/* Chef 2 */}
            <div className="bg-white p-6 rounded-xl shadow text-center">
              <img
                src="https://i.pravatar.cc/150?img=12"
                alt="Chef Liam"
                className="w-24 h-24 mx-auto rounded-full mb-4"
              />
              <h4 className="text-xl font-semibold text-gray-800">
                Chef Liam Jones
              </h4>
              <p className="text-gray-500 text-sm">
                Modern fusion and vegan specialist
              </p>
            </div>
            {/* Chef 3 */}
            <div className="bg-white p-6 rounded-xl shadow text-center">
              <img
                src="https://i.pravatar.cc/150?img=5"
                alt="Chef Mia"
                className="w-24 h-24 mx-auto rounded-full mb-4"
              />
              <h4 className="text-xl font-semibold text-gray-800">
                Chef Mia Chen
              </h4>
              <p className="text-gray-500 text-sm">
                Master of quick and healthy meals
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ExtraSection2;
