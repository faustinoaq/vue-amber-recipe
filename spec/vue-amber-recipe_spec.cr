require "./spec_helper"

build_amber

describe "Generated fake_app using slang template" do
  generate_fake_app(template: "slang")

  it "shards check - dependencies" do
    check_fake_app_dependencies.should be_true
  end

  it "shards build - generates a binary" do
    build_fake_app.should be_true
  end

  it "executes specs" do
    test_fake_app.should be_true
  end
# ensure
#   cleanup
# end

# describe "Generated fake_app using ecr template" do
#   generate_fake_app(template: "ecr")

#   it "shards check - dependencies" do
#     check_fake_app_dependencies.should be_true
#   end

#   it "shards build - generates a binary" do
#     build_fake_app.should be_true
#   end

#   it "executes specs" do
#     test_fake_app.should be_true
#   end
# ensure
#   cleanup
end
