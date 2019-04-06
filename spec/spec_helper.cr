require "spec"

def build_amber
  unless File.exists?("./bin/amber")
    system("shards build amber --production")
  end
end

def generate_fake_app(template = "slang")
  system("./bin/amber new fake_app -r $(pwd) -d sqlite -t #{template} --deps")
  system("cd fake_app && ../bin/amber g controller Information all")
  system("cd fake_app && ../bin/amber g model Data title:string body:text")
  system("cd fake_app && ../bin/amber g scaffold Category title:string")
  system("cd fake_app && ../bin/amber g scaffold Product title:string description:text category:reference")
  system("cd fake_app && ../bin/amber g scaffold Comment body:text product:reference")
  system("cd fake_app && ../bin/amber db migrate")
end

def check_fake_app_dependencies
  system("cd fake_app && shards check")
end

def build_fake_app
  system("cd fake_app && shards build fake_app")
end

def test_fake_app
  system("cd fake_app && crystal spec")
end

def cleanup
  system("rm -rf fake_app")
end
